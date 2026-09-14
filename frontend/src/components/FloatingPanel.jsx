import { motion } from 'framer-motion';

const FloatingPanel = ({ children, delay = 0, className = '' }) => {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: delay }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className={`glass-panel p-6 ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default FloatingPanel;
