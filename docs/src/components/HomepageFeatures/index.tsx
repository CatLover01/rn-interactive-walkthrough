import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Highlight Anything',
    description: (
      <>
        Measure any view on the screen and highlight it with a mask, then
        position your tooltips relative to it. Just attach an <code>onLayout</code>{' '}
        handler, with no wrapper components or HOCs required.
      </>
    ),
  },
  {
    title: 'Multiple Masks per Step',
    description: (
      <>
        Spotlight several parts of the screen at once in a single step. Each
        mask can be independently interactable or blocked, with its own press
        handlers.
      </>
    ),
  },
  {
    title: 'Native Performance',
    description: (
      <>
        Smooth transitions use <code>LayoutAnimation</code>, running natively on
        Android and iOS. No native linking required, and it works out of the box
        with Expo.
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
