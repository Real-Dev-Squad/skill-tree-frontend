export const debounce = <T extends (...args: any[]) => void>(
    fn: T,
    delay: number = 300
): ((...args: Parameters<T>) => void) => {
    let timeoutId: ReturnType<typeof setTimeout>

    return (...args: Parameters<T>): void => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}
