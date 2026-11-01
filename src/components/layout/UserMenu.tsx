import Link from "next/link";

const menuLinks = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Add New Studio", href: "/add-studio" },
    { label: "My Studio Listings", href: "/my-listings" },
    { label: "My Bookings", href: "/my-bookings" },
];

export default function UserMenu({
    name,
    image,
}: {
    name: string;
    image?: string;
}) {
    const firstLetter = name.charAt(0).toUpperCase();

    return (
        <div className="dropdown dropdown-end dropdown-hover">
            <div
                tabIndex={0}
                role="button"
                className="flex h-10 w-10 items-center justify-center overflow-hidden border border-base-content bg-base-200 font-bold"
            >
                {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={image} alt={name} className="h-full w-full object-cover" />
                ) : (
                    firstLetter
                )}
            </div>

            <ul
                tabIndex={0}
                className="dropdown-content menu z-50 mt-2 w-60 border border-base-content bg-base-100 p-2"
            >
                <li className="menu-title text-base-content">{name}</li>
                {menuLinks.map((item) => (
                    <li key={item.href}>
                        <Link href={item.href}>{item.label}</Link>
                    </li>
                ))}
                <li>
                    <button type="button">Logout</button>
                </li>
            </ul>
        </div>
    );
}