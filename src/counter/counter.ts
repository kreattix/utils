export interface CounterProps {
  count: number;
}

export const Counter = (props: CounterProps) => {
  return props.count;
};
