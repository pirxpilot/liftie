function getStatus(fileName) {
    const match = fileName.match(/lp_runway_trail_(\w+)\.svg$/);
    if (match) {
        return match[1] === 'opened' ? 'open' : 'closed';
    }
    return 'closed'; // Default case if the format does not match
}
