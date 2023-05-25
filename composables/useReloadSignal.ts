export default () => {
  const useReloadSignal = () => useState('reloadSignal', () => 0);

  const signal = useReloadSignal();

  function trigger() {
    signal.value++;
  }

  return {
    trigger,
    signal,
  }
}