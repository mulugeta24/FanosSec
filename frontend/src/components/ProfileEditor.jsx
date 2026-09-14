import React, { useEffect, useState } from 'react';
import { Check, Edit3, ImagePlus, LoaderCircle, X } from 'lucide-react';

const ProfileEditor = ({ user, updateProfile, compact = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState(user?.avatar || user?.profileImage || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEditing) {
      setAvatar(user?.avatar || user?.profileImage || '');
      setBio(user?.bio || '');
    }
  }, [user?.avatar, user?.profileImage, user?.bio, isEditing]);

  const displayName = user?.name || (user?.role === 'admin' ? 'Administrator' : 'Learner');
  const initials = displayName.charAt(0).toUpperCase();

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Choose an image file.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError('Choose an image smaller than 2 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result);
      setError('');
    };
    reader.onerror = () => setError('The image could not be read.');
    reader.readAsDataURL(file);
  };

  const startEditing = () => {
    setAvatar(user?.avatar || user?.profileImage || '');
    setBio(user?.bio || '');
    setError('');
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setAvatar(user?.avatar || user?.profileImage || '');
    setBio(user?.bio || '');
    setError('');
    setIsEditing(false);
  };

  const saveChanges = async () => {
    setSaving(true);
    setError('');
    const result = await updateProfile(avatar, bio);
    setSaving(false);
    if (!result.success) {
      setError(result.error || 'Profile update failed.');
      return;
    }
    setIsEditing(false);
  };

  const avatarNode = (
    <div className={`${compact ? 'h-20 w-20' : 'h-28 w-28'} relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-cyber-neon/60 bg-[#0b0f0d] shadow-[0_0_24px_rgba(0,255,102,0.2)]`}>
      {avatar ? (
        <img src={avatar} alt={`${displayName} profile`} className="h-full w-full object-contain" />
      ) : (
        <span className={`${compact ? 'text-2xl' : 'text-4xl'} font-black text-cyber-neon`}>{initials}</span>
      )}
      {isEditing && (
        <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/70 text-cyber-neon opacity-0 transition-opacity hover:opacity-100" title="Change avatar">
          <ImagePlus className="h-6 w-6" />
          <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
        </label>
      )}
    </div>
  );

  return (
    <section className={compact ? 'w-full' : 'rounded-2xl border border-cyber-neon/20 bg-[#0b0f0d] p-5'} aria-label="Profile">
      <div className={`flex ${compact ? 'items-center gap-3' : 'items-start gap-5'}`}>
        {avatarNode}
        <div className="min-w-0 flex-1">
          <h2 className={`${compact ? 'text-base' : 'text-xl'} mt-1 truncate font-bold text-white`}>{displayName}</h2>
          {!isEditing && (
            <p className={`${compact ? 'mt-1 text-[11px]' : 'mt-2 text-sm'} ${user?.bio ? 'text-gray-300' : 'text-gray-500'} leading-relaxed`}>
              {user?.bio || 'Add a short introduction about your security interests.'}
            </p>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="mt-4 space-y-3">
          <textarea
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            maxLength={240}
            rows={compact ? 3 : 4}
            placeholder="Write a short bio about your security interests..."
            className="w-full resize-none rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm leading-relaxed text-gray-200 placeholder:text-gray-600 focus:border-cyber-neon/50 focus:outline-none"
          />
          <p className="text-[10px] text-gray-500">Hover the avatar to change the profile image. Maximum image size: 2 MB.</p>
          {error && <p className="text-xs text-red-300">{error}</p>}
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={saveChanges} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-cyber-neon px-3 py-2 text-xs font-bold uppercase tracking-wide text-black transition hover:bg-white disabled:opacity-50">
              {saving ? <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
              {saving ? 'Saving...' : 'Save changes'}
            </button>
            <button type="button" onClick={cancelEditing} disabled={saving} className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-xs font-bold uppercase tracking-wide text-gray-300 transition hover:border-white/50 hover:text-white disabled:opacity-50">
              <X className="h-3.5 w-3.5" /> Cancel
            </button>
          </div>
        </div>
      )}

      {!isEditing && (
        <button type="button" onClick={startEditing} className="mt-4 inline-flex items-center gap-2 rounded-lg border border-cyber-neon/40 px-3 py-2 text-xs font-bold uppercase tracking-wide text-cyber-neon transition hover:bg-cyber-neon/10">
          <Edit3 className="h-3.5 w-3.5" /> Edit profile
        </button>
      )}
    </section>
  );
};

export default ProfileEditor;
