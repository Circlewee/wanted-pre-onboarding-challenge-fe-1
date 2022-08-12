import styled, { keyframes, css } from 'styled-components';

const skeletonLoading = keyframes`
  0% {
    background-color: hsl(200, 20%, 80%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
`;

const SkeletonElement = styled.div<{ width: number; height: number; amount: number }>`
  width: ${(props) => props.width}rem;
  height: ${(props) => props.height}rem;
  animation: ${skeletonLoading} 0.8s linear infinite alternate;

  ${(props) =>
    props.amount > 1 &&
    css`
      & + & {
        margin-top: 1.2rem;
      }
    `}
`;

interface Props {
  width: number;
  height: number;
  amount?: number;
}

const Skeleton = ({ width, height, amount = 1 }: Props) => {
  return (
    <>
      {Array.from({ length: amount }).map(() => (
        <SkeletonElement width={width} height={height} amount={amount} key={Math.random()} />
      ))}
    </>
  );
};

export default Skeleton;
