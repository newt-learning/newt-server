interface MetaTags {
  title?: string;
}

function useMetaTags({ title }: MetaTags) {
  if (title) {
    document.title = title;
  }
}

export default useMetaTags;
