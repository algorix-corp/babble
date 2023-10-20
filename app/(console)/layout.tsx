import ConsoleNav from "./ConsoleNav"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <ConsoleNav />
            {children}
        </div>
    )
}