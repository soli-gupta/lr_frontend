import { AutoViewer } from "@helloar/auto-viewer";

export default function WrappedViewer({ autoRef, ...props }) {
    return <AutoViewer {...props} ref={autoRef} />;
}