export default function isLink(str: string): boolean {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?(\?[^\s]*)?$/;
    return /^https?:\/\//.test(str) && urlPattern.test(str);
}
