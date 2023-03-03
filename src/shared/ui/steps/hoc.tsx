import * as React from 'react'

export function HOC<T, P extends {}>(
    Component: React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>>
): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>> {
    return React.forwardRef<T, P>(
        function ComponentFromHOC(props, ref) {
            return (
                <Component {...props as React.PropsWithoutRef<P>} ref={ref} />
            );
        }
    )
}