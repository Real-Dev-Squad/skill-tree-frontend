// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => void>(
    fn: T,
    delay = 300
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
