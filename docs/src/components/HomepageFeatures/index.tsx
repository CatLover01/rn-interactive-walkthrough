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
    title: 'Any Overlay You Want',
    description: (
      <>
        The overlay is just a React component: tooltips, callouts, bottom
        sheets, or full-screen cards. Each step can use a different one, and
        props flow through <code>contentComponentProps</code> with full
        type-safety.
      </>
    ),
  },
  {
    title: 'Smooth, Native Animations',
    description: (
      <>
        Transitions run on the UI thread with{' '}
        <code>react-native-reanimated</code>, morphing the mask from step to
        step. No native linking required, and it works out of the box with Expo.
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
