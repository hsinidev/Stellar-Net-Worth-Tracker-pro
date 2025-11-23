import React, { useState, useCallback, PropsWithChildren } from 'react';
import { AboutIcon, ContactIcon, DmcaIcon, GuideIcon, PrivacyIcon, TermsIcon } from './Icons';

type ModalType = 'About' | 'Contact' | 'Guide' | 'Privacy Policy' | 'Terms of Service' | 'DMCA' | null;

const GalaxyBackground: React.FC = () => (
  <div className="fixed top-0 left-0 w-full h-full -z-50 overflow-hidden bg-space-dark">
    {/* Deep Space Base */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#0b0c15] to-[#111222]"></div>
    
    {/* Nebula Layers */}
    <div className="absolute inset-0 opacity-40 mix-blend-screen animate-pulse-slow">
        <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] bg-purple-900 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] bg-blue-900 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute top-[40%] left-[30%] w-[50%] h-[50%] bg-accent-magenta rounded-full blur-[150px] opacity-20"></div>
        <div className="absolute bottom-[20%] left-[10%] w-[40%] h-[40%] bg-accent-cyan rounded-full blur-[130px] opacity-20"></div>
    </div>

    {/* Stars */}
    <div id="stars1" className="star-layer"></div>
    <div id="stars2" className="star-layer"></div>

    <style>{`
      @keyframes move-stars { from { transform: translateY(0); } to { transform: translateY(-1000px); } }
      .star-layer {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: transparent;
        animation: move-stars 150s linear infinite;
      }
      #stars1 {
        background-image: radial-gradient(1px 1px at 20px 30px, #fff, rgba(0,0,0,0)),
                          radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)),
                          radial-gradient(1px 1px at 50px 160px, #fff, rgba(0,0,0,0)),
                          radial-gradient(1.5px 1.5px at 90px 40px, #fff, rgba(0,0,0,0)),
                          radial-gradient(1px 1px at 130px 80px, #fff, rgba(0,0,0,0)),
                          radial-gradient(1.5px 1.5px at 160px 120px, #fff, rgba(0,0,0,0));
        background-size: 200px 200px;
        opacity: 0.6;
      }
      #stars2 {
        background-image: radial-gradient(2px 2px at 100px 150px, #fff, rgba(0,0,0,0)),
                          radial-gradient(2px 2px at 200px 50px, #fff, rgba(0,0,0,0));
        background-size: 300px 300px;
        animation-duration: 200s;
        opacity: 0.4;
      }
    `}</style>
  </div>
);


const Header: React.FC<{ onModalOpen: (type: ModalType) => void }> = ({ onModalOpen }) => {
    const navItems = [
        { name: 'About', icon: <AboutIcon />, type: 'About' as ModalType },
        { name: 'Contact', icon: <ContactIcon />, type: 'Contact' as ModalType },
        { name: 'Guide', icon: <GuideIcon />, type: 'Guide' as ModalType },
        { name: 'Privacy', icon: <PrivacyIcon />, type: 'Privacy Policy' as ModalType },
        { name: 'Terms', icon: <TermsIcon />, type: 'Terms of Service' as ModalType },
        { name: 'DMCA', icon: <DmcaIcon />, type: 'DMCA' as ModalType },
    ];
    return (
        <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-space-dark/60 border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-2">
                         <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent-cyan to-accent-magenta animate-pulse-slow"></div>
                        <span className="font-display font-bold text-xl tracking-tight text-white">Stellar<span className="text-accent-cyan">NetWorth</span></span>
                    </div>
                    <nav className="hidden md:flex md:space-x-1">
                        {navItems.map(item => (
                            <button key={item.name} onClick={() => onModalOpen(item.type)} className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                                {item.name}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
             <nav className="md:hidden flex overflow-x-auto p-2 gap-2 bg-space-dark/80 backdrop-blur-xl border-b border-white/5">
                {navItems.map(item => (
                    <button key={item.name} onClick={() => onModalOpen(item.type)} className="flex-shrink-0 text-gray-300 hover:text-white px-3 py-2 rounded-md text-xs font-medium transition-colors flex flex-col items-center">
                       {item.icon}
                       <span className="mt-1">{item.name}</span>
                    </button>
                ))}
            </nav>
        </header>
    );
};

const Footer: React.FC = () => (
    <footer className="mt-auto py-8 bg-space-dark/80 backdrop-blur-md border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-400 mb-2">
                Powered by <a href="https://github.com/hsinidev" target="_blank" rel="noopener noreferrer" className="text-accent-cyan font-bold hover:text-accent-magenta transition-colors">HSINI MOHAMED</a>
            </p>
            <div className="text-sm text-gray-500 space-x-4">
                <a href="http://doodax.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">doodax.com</a>
                <span>&bull;</span>
                <a href="mailto:hsini.web@gmail.com" className="hover:text-white transition-colors">hsini.web@gmail.com</a>
            </div>
            <p className="text-xs text-gray-600 mt-4">&copy; {new Date().getFullYear()} Stellar Net Worth Tracker. All rights reserved.</p>
        </div>
    </footer>
);

const Modal: React.FC<{ title: string; onClose: () => void; children: React.ReactNode }> = ({ title, onClose, children }) => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in" onClick={onClose}>
        <div className="bg-[#1a1f2e] border border-accent-cyan/20 rounded-2xl shadow-[0_0_50px_-12px_rgba(51,211,212,0.2)] w-full max-w-3xl max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-white/10 bg-[#1a1f2e] rounded-t-2xl z-10">
                <h3 className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-magenta">{title}</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full p-2">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            <div className="p-6 overflow-y-auto text-gray-300 leading-relaxed text-sm sm:text-base space-y-4">
                {children}
            </div>
        </div>
    </div>
);


const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [activeModal, setActiveModal] = useState<ModalType>(null);

    const handleModalOpen = useCallback((type: ModalType) => {
        setActiveModal(type);
    }, []);

    const handleModalClose = useCallback(() => {
        setActiveModal(null);
    }, []);
    
    const getModalContent = (type: ModalType) => {
        switch (type) {
            case 'About': return (
                <div className="space-y-4">
                    <p><strong>Stellar Net Worth Tracker</strong> is a premier financial utility designed to give users a clear, secure, and aesthetically pleasing view of their financial standing.</p>
                    <p>Built with cutting-edge web technologies (React 18, TypeScript, Tailwind CSS), this application operates entirely in your browser with a simulated secure backend environment. Our mission is to demystify personal finance by providing a tool that is as beautiful to use as it is functional.</p>
                    <p>Developed by <strong>HSINI MOHAMED</strong>, a full-stack engineer passionate about creating intuitive user experiences.</p>
                </div>
            );
            case 'Contact': return (
                <div className="space-y-4 text-center">
                    <p>We value your feedback and are here to assist with any technical issues.</p>
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 mt-4">
                        <p className="text-lg font-semibold text-white">HSINI MOHAMED</p>
                        <p className="mt-2 text-accent-cyan">hsini.web@gmail.com</p>
                        <p className="mt-1 text-accent-magenta">doodax.com</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">For business inquiries or bug reports, please email us directly.</p>
                </div>
            );
            case 'Guide': return (
                <div className="space-y-4">
                    <h4 className="text-lg font-bold text-white">How to Use</h4>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Add Assets:</strong> Input items of value such as cash, investments, real estate, and vehicles.</li>
                        <li><strong>Add Liabilities:</strong> Input debts such as mortgages, student loans, and credit card balances.</li>
                        <li><strong>Review:</strong> Watch the dashboard automatically calculate your total Net Worth.</li>
                        <li><strong>Visualize:</strong> Use the interactive charts to understand your asset-to-debt ratio.</li>
                    </ul>
                </div>
            );
            case 'Privacy Policy': return (
                <div className="space-y-4 text-sm">
                    <p><strong>Last Updated: October 2023</strong></p>
                    <p>At Stellar Net Worth Tracker (accessible from WorthTracker.doodax.com), one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Stellar Net Worth Tracker and how we use it.</p>
                    <h4 className="text-white font-bold mt-4">Information We Collect</h4>
                    <p>We do not collect any personal identifiable information (PII) such as names, addresses, or phone numbers. The financial data you enter is associated with an anonymous user ID stored locally in your session or a secure database simulation.</p>
                    <h4 className="text-white font-bold mt-4">How We Use Your Information</h4>
                    <p>The data entered is strictly used for the calculation and visualization of your net worth within the application interface. We do not sell, trade, or otherwise transfer your data to outside parties.</p>
                    <h4 className="text-white font-bold mt-4">Cookies and Web Beacons</h4>
                    <p>Like any other website, Stellar Net Worth Tracker uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
                    <h4 className="text-white font-bold mt-4">Contact Us</h4>
                    <p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at hsini.web@gmail.com.</p>
                </div>
            );
            case 'Terms of Service': return (
                <div className="space-y-4 text-sm">
                    <p><strong>1. Terms</strong></p>
                    <p>By accessing this Website, accessible from WorthTracker.doodax.com, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws.</p>
                    <p><strong>2. Use License</strong></p>
                    <p>Permission is granted to temporarily download one copy of the materials on Stellar Net Worth Tracker's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
                    <p><strong>3. Disclaimer</strong></p>
                    <p>All the materials on Stellar Net Worth Tracker’s Website are provided "as is". HSINI MOHAMED makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, HSINI MOHAMED does not make any representations concerning the accuracy or likely results of the use of the materials on its Website or otherwise relating to such materials or on any sites linked to this Website.</p>
                    <p><strong>4. Limitations</strong></p>
                    <p>In no event shall HSINI MOHAMED or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Stellar Net Worth Tracker’s Website.</p>
                </div>
            );
            case 'DMCA': return (
                <div className="space-y-4">
                    <p>If you believe that your intellectual property rights have been violated by Stellar Net Worth Tracker, please provide the following information to our designated Copyright Agent:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>A description of the copyrighted work or other intellectual property that you claim has been infringed;</li>
                        <li>A description of where the material that you claim is infringing is located on the site;</li>
                        <li>Your address, telephone number, and email address;</li>
                        <li>A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law;</li>
                    </ul>
                    <p className="mt-4">Please contact us via email at: <strong>hsini.web@gmail.com</strong></p>
                </div>
            );
            default: return null;
        }
    };

    return (
        <div className="min-h-screen flex flex-col font-sans relative selection:bg-accent-cyan selection:text-space-dark">
            <GalaxyBackground />
            <Header onModalOpen={handleModalOpen} />
            <main className="flex-grow flex flex-col items-center w-full">
                {children}
            </main>
            <Footer />
            {activeModal && (
                <Modal title={activeModal} onClose={handleModalClose}>
                    {getModalContent(activeModal)}
                </Modal>
            )}
        </div>
    );
};

export default Layout;