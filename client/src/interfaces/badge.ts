interface Badge {
    type: BadgeType;
    available: boolean;
}

enum BadgeType {
    location, connection
}

export default Badge;
export { BadgeType };