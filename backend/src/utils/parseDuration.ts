export const parseDuration = (str: string): number => {
    const match = /^(\d+)([smhd])$/.exec(str);
    if (!match) return 0;
    const value = parseInt(match[1], 10);
    const unit = match[2];
    switch (unit) {
        case 's': return value;
        case 'm': return value * 60;
        case 'h': return value * 60 * 60;
        case 'd': return value * 60 * 60 * 24;
        default: return 0;
    }
}

