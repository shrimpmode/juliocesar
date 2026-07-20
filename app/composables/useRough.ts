type UseRough = {
  id: string;
  draw: (rc: any, svg: any) => void;
};
export const useRough = ({ id, draw }: UseRough) => {
  const { $rough } = useNuxtApp();
  onMounted(async () => {
    const svg = document.getElementById(id);
    const rc = $rough.svg(svg);
    draw(rc, svg);
  });
};
