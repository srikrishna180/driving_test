import { useEffect, useState } from "react";
import { getViewer, type Viewer } from "~/lib/booking-api";

/**
 * Who, if anyone, is signed in.
 *
 * This site is a different origin from the booking app, so it can't read the
 * session directly — it asks the app, with the shared parent-domain cookie
 * attached. Returns `null` until the answer arrives, which is why callers
 * render nothing rather than guessing: flashing "Log in" at someone who is
 * already signed in is worse than a brief gap.
 */
export function useViewer(): Viewer | null {
    const [viewer, setViewer] = useState<Viewer | null>(null);

    useEffect(() => {
        let cancelled = false;
        getViewer()
            .then((v) => !cancelled && setViewer(v))
            // A signed-out visitor is the normal case; treat a failure the
            // same way rather than breaking the navbar over it.
            .catch(() => undefined);
        return () => {
            cancelled = true;
        };
    }, []);

    return viewer;
}
