export const loadScript = (id, src) => {
  const existingTag = document.getElementById(id);
  if(existingTag === null) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = true;
    script.id = id;
    document.body.appendChild(script);
  }
}
