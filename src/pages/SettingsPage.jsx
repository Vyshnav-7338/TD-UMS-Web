import Header from "../components/common/Header";
import DangerZone from "../components/settings/DangerZone";
import Profile from "../components/settings/Profile";

const SettingsPage = () => {
    const handleLogout = () => {
        ["token", "user"].forEach(item => localStorage.removeItem(item));
        window.location.href = "/";
    };

    return (
        <div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
            <Header title='Settings' logout={true} onLogout={handleLogout} />
            <main className='max-w-4xl mx-auto py-6 px-4 lg:px-8'>
                <Profile />
                <DangerZone />
            </main>
        </div>
    );
};

export default SettingsPage;
