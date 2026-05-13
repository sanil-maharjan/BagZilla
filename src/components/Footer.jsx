export default function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                <div>© 2026 BagZilla. All rights reserved.</div>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-gray-900 transition-colors">Terms of Use</a>
                </div>
            </div>
        </footer>
    );
}
