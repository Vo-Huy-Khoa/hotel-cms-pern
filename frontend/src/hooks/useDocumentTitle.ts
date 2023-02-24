import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

export function useDocumentTitle(title: string): void {
  useIsomorphicLayoutEffect(() => {
    window.document.title = title;
  }, [title]);
}
export default useDocumentTitle;

// How to use
// import { useDocumentTitle } from 'usehooks-ts'

// export default function Component() {
//   useDocumentTitle('foo bar')
// }
