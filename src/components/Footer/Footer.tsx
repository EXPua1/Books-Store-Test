import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white p-4 text-center sticky bottom-0 ">
            <a
                href="https://github.com/EXPua1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
            >
                My GitHub
            </a>
        </footer>
    );
};

export default Footer;