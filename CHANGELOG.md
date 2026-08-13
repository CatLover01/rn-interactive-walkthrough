# Changelog

## [2.0.0](https://github.com/CatLover01/rn-interactive-walkthrough/compare/v1.1.0...v2.0.0) (2026-08-13)

### Features

* constrain navigation to an active walkthrough and support start(stepNumber) ([9a864e1](https://github.com/CatLover01/rn-interactive-walkthrough/commit/9a864e1f1ac371a0a32e8207ec2d8fd8081810aa))

## [1.1.0](https://github.com/CatLover01/rn-interactive-walkthrough/compare/v1.0.0...v1.1.0) (2026-08-12)

### Features

* add WalkthroughStep component for automatic layout measurement ([cbde138](https://github.com/CatLover01/rn-interactive-walkthrough/commit/cbde13862ffce3e164a28145d42b8433fcf11a13))

## [1.0.0](https://github.com/CatLover01/rn-interactive-walkthrough/compare/v0.4.0...v1.0.0) (2026-08-12)

### Features

* add configurable pulsing mask animation ([bb5a0c0](https://github.com/CatLover01/rn-interactive-walkthrough/commit/bb5a0c04600941ed744bc3791eb1d8bf81583c8a))
* add provider-level mask interaction override ([3d4223e](https://github.com/CatLover01/rn-interactive-walkthrough/commit/3d4223e1587d1dd4a5cc1ff40b4cc535fab4652c))
* unregister steps when their view unmounts ([7d994eb](https://github.com/CatLover01/rn-interactive-walkthrough/commit/7d994eb440a1206c83e8bc6fb208e0f30eba3f6d))

### Bug Fixes

* **example:** fade modal shadows with the overlay animation ([1c11ea2](https://github.com/CatLover01/rn-interactive-walkthrough/commit/1c11ea2b0576ec5940cfb06b7272b050ec07f547))
* **example:** lock gallery walkthrough masks on scroll ([89533ce](https://github.com/CatLover01/rn-interactive-walkthrough/commit/89533ce685acd61b07d4267095fb99442ad45933))
* prevent stale closure in measureMask ([549e47d](https://github.com/CatLover01/rn-interactive-walkthrough/commit/549e47debd73443294c70ba1ae6fb45a6c8ebeae))
* support non-contiguous step numbers in navigation ([c06b16f](https://github.com/CatLover01/rn-interactive-walkthrough/commit/c06b16f8b57179696cdd3a9f0af5af6923846567))

## [0.4.0](https://github.com/CatLover01/rn-interactive-walkthrough/compare/v0.3.0...v0.4.0) (2026-08-11)

### Features

* add isFirstStep and isLastStep ([a04dff2](https://github.com/CatLover01/rn-interactive-walkthrough/commit/a04dff2c168dd350c21f776ec73499b2913b4c3f))
* add provider-level layout adjustments ([e5b192e](https://github.com/CatLover01/rn-interactive-walkthrough/commit/e5b192ee3a76aa61182671c074555d1c3507eefc))
* add useContentPlacement hook with safe-area-aware tooltip positioning ([264ea4c](https://github.com/CatLover01/rn-interactive-walkthrough/commit/264ea4c66580490a1e33714f81eab75cafeb2908))
* allow reusable contentComponent default on provider ([5283da5](https://github.com/CatLover01/rn-interactive-walkthrough/commit/5283da582ce5f5f395447d75a5a935f10a7ed039))
* stop swallowing the Android back button ([cefce90](https://github.com/CatLover01/rn-interactive-walkthrough/commit/cefce90beaa3833742435d9a399415108445bc53))
* support per-step mask animation duration ([316acbf](https://github.com/CatLover01/rn-interactive-walkthrough/commit/316acbf6d51e6db5072767f6d2b35acfe5e472ab))

### Bug Fixes

* build package before example typecheck ([29ec7ff](https://github.com/CatLover01/rn-interactive-walkthrough/commit/29ec7ff5ea704abb344db504a11439f83a7c2b6a))
* cross-fade full screen steps ([df56965](https://github.com/CatLover01/rn-interactive-walkthrough/commit/df5696501f037868c461192dd608db791625a19d))
* prevent dim regions from overlapping ([0352eef](https://github.com/CatLover01/rn-interactive-walkthrough/commit/0352eef589c219c9155f7a0d009c613e1328fa50))
* type contentComponent with generic props ([5bbc3fb](https://github.com/CatLover01/rn-interactive-walkthrough/commit/5bbc3fb0e9f7a0784a6f6f08c006fb994b2d848c))

## [0.3.0](https://github.com/CatLover01/rn-interactive-walkthrough/compare/v0.2.0...v0.3.0) (2026-08-08)

### Bug Fixes

* replace LayoutAnimation with react-native-reanimated layout animations ([08383f6](https://github.com/CatLover01/rn-interactive-walkthrough/commit/08383f6eb723e5aeb76c1ab88f1d3b23ca8ba7cf))

## [0.2.0](https://github.com/CatLover01/rn-interactive-walkthrough/compare/v0.1.0...v0.2.0) (2026-08-06)

### Bug Fixes

* restore maskAllowInteraction prop ([f5638c8](https://github.com/CatLover01/rn-interactive-walkthrough/commit/f5638c86acba57187c1e67dde8e25cd2786620b1))
* type overlayComponentProps via per-step generic useWalkthroughStep<P> ([17d0006](https://github.com/CatLover01/rn-interactive-walkthrough/commit/17d0006ec51ce5b780604c0297399aae27645f04))
