const mainNavigationItems = [
    {
        name: "Home",
        path: "/",
        icon: "bi-house",
        subNavItems: undefined,
    },
    {
        name: "Elections",
        path: "/elections",
        icon: "bi-check2-circle",
        subNavItems: undefined,
    },
    {
        name: "Dictionaries",
        path: undefined,
        icon: "bi-journal-text",
        subNavItems: [
            {
                name: "Countries",
                path: "/countries",
                icon: "bi-geo-alt",
            },
            {
                name: "Election types",
                path: "/election_types",
                icon: "bi-archive",
            }
        ],
    }
];
export default mainNavigationItems;