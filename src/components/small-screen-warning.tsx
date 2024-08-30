// TODO - @yesyash : remove this component after implementing the mobile version of the application.
// ---
// Show a warning message if the user is on a mobile device or a tablet.
// this will be hidden on screen sizes larger than 1280px.
// ---
export const SmallScreenWarning = () => {
    return (
        <div className="fixed left-0 top-0 z-[10000] flex h-screen w-full flex-col items-center justify-center bg-gray-900 p-4 text-center md:hidden">
            <h3 className="text-xl font-bold text-gray-50">Small Screen detected</h3>
            <p className="text-gray-400">This application is not supported on devices below 1280px</p>
        </div>
    )
}
