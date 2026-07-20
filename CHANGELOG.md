# Changelog

## 1.0.0 (2026-07-20)


### ⚠ BREAKING CHANGES

* introduce UUIDs on terminals

### Features

* add action for importing bay typicals ([e0c6cea](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/e0c6ceabbb20ec16b0617bf464e2e2f6a73b53bd))
* add disable property ([8ba87ce](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/8ba87cee333d0ec0b3cc6240de1abd24c497c3cf))
* add highlight property ([6f119ae](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/6f119aec2146fa37a47d860d7fd398c0fad5bad5))
* add intial architecture documentation ([bde700c](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/bde700c1c1ed6a968c6e38036c3d6dc811929520))
* add more primary apparatus icons ([4f3c1c4](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/4f3c1c4c9f736b7eb28d894c1e101cabcf4fed7e))
* add movable text labels ([fc503cc](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/fc503cc7be6fa70ebafac00cda4b0a3d46be1181))
* add redimentatry convert function ([ca1c1bf](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/ca1c1bfa5ca82d86eda17486f3cc3a48c13494a3))
* add selectable property ([efcabd1](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/efcabd17f5ee2f71c6f38d49ff416c107e10d6cc))
* add title to IED edits ([e9eafc0](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/e9eafc02eb0e33c5fb8db4789e748ddea8e68287))
* add, move and resize voltage levels ([dbdb81a](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/dbdb81ac08c87d30ad21a769dae82d2e298a0ea3))
* add, move, resize bays ([6b00efd](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/6b00efdb126d4e613560ad1f36de0072c6e50412))
* add, move, resize, delete bus bars ([1f255fb](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/1f255fb1f72b687f67b807812e7c2df3c0e03f50))
* add, move, rotate, flip conducting equipment ([17bc3af](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/17bc3aff042b216472e4c8d98d9ee8f066ea24b2))
* cancel current edit ([#36](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/issues/36)) ([a35efc4](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/a35efc446ab350eed532ab175cf4fd9158f1f3be))
* connect and ground equipment ([4c3555f](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/4c3555f21d8c3fed506d6f723dd25b6b2b3dfc9e))
* copy containers and conducting equipment ([e36c1ca](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/e36c1caab09bba78bf05e8fd2b14cb6eb4b28cbe))
* create and resize substations ([203279a](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/203279ad30e17e4de6643e8ef1c81c1fe77cbb33))
* decomposed placeElement into pure "edit builder" functions and moved to edits.ts ([e262353](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/e262353601ebe029435e5ca6dbd19dbca6bf8194))
* expose sld-editor and sld-substation-viewer as npm components = README.md update ([68d4113](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/68d4113ff99299f83e19ea011ed4346f29e2c1a7))
* make SLD SVG 1.1 compatible ([e97dbc4](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/e97dbc460b75c2f8eceed9baf5c759b8d8572e08))
* migrate to new EditV2 api ([691281b](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/691281b5c4bf65c60bd30d733b22e5edc6c67ae3))
* modernize everything ([21ac60f](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/21ac60fb53067f00f7fd7aa635908dd2840b5147))
* move to Reference element, update and improve tests, add convert tests ([cd2e7cf](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/cd2e7cf21c02557bea8dce5a8ee9838ccfe985ff))
* moved scl/ied edit handling from sld-substation-editor to sld-editor ([5be12c3](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/5be12c32d788c86475411c151e60c6f279f16aa0))
* open wizards ([53e9a94](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/53e9a9430603d723273bfe7dfbcb928487bed02b))
* place IEDs within Private element in Substation section (closes [#114](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/issues/114)) ([6aa458a](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/6aa458abc66d2ebf8b3b9db219b5fd71786779ab))
* refactor connectivity-node into its own artifact ([81dc36a](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/81dc36a8544d8a39a6d357120bf8e9d906d75444))
* refactor context-menu out of substation editor ([480c7d2](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/480c7d29a7cc15a30ffe5f3ba444ef66fcca28b4))
* refactor placement functions into sld-placement.ts ([c662596](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/c662596600583969ace46707660922637e8552d1))
* refactor svg/diagram logic (labels) into discriptor/artifact ([79d964f](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/79d964f21406c9c2f43c0adc006aecab51508242))
* refactor svg/diagram logic into descriptors/artifacts (initial pass) ([5e5676b](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/5e5676bfe21c34fe6dfec41f9f43911e293c0b02))
* refactor svg/diagram logic into descriptors/artifacts (initial pass) ([c2d5ad8](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/c2d5ad8de5087141cc82198c77f087e43fb05eb3))
* refactor toolbar into its own components ([612d44c](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/612d44ca977b08ad853da2ee5638abd93277fc9f))
* refactored icons out into oscd-sld-icons AND diagram-symbols.ts ([3fe4fe8](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/3fe4fe8835db9eadd2d24afdea14a9ca22d978d5))
* remove elements ([dca6174](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/dca6174aee1706d200c24ad41cd3342cb0f329df))
* split container renderer into renderVoltageLevel/renderBay ([c595a0b](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/c595a0b49c1be59025a8561dce23fadd0ac1d1a1))


### Bug Fixes

* add caching layer to speed up IED rendering ([ca946d8](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/ca946d8357012748ffba60d804eefff7d446d9da))
* broken mirroring ([56a3c87](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/56a3c87961ecdb55b4a75f86de7fa21c856a1c50))
* comment back out webkit & firefox, add .rollup.cache to ignores ([f433a09](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/f433a0996027205c3e0ae49ff8ef959df45065c5))
* correct rimraf snapshot exclusion ([8dfb677](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/8dfb677c02ce6c355b5b29819366edb5e18ee50c))
* don't merge feeders into bus bar sections ([b68fd31](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/b68fd314fdcaa61ba836872c76d93f15c0a87765))
* eosld as default ([30eac13](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/30eac1313b609514090caada8df20eb7f5df53c8))
* floating connections to connectivity nodes ([4132db7](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/4132db7d4f6012e06d6cddd8ebe2a0b054d8c167))
* improve sorting of IED names ([1608fe7](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/1608fe71c7dea009e454cd13580f7f92fa91e95e))
* introduce UUIDs on terminals ([6235a7e](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/6235a7eb652180f8bba10c78a3d8ed018b7daa85))
* migrate grounded terminals of moved equipment ([497c84f](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/497c84fb1e04ed898f184f8639950e663247af38))
* move equipment into bus bar ([e574711](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/e574711585cbb9ccbd5dc615d808c1203d0ea61c))
* no topless capacitors allowed ([afd3b1c](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/afd3b1cf024b2d98aec257c7c59ff1107498f8dd))
* power transformer handle click ([8829748](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/8829748b4b04772f79706a1efd5449c615bb3117))
* preview connection only in its substation ([fff9671](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/fff9671b1718b77b44112404666f13c566916eb6))
* preview moving labels correctly ([ecdfbe5](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/ecdfbe520a4296184e49875e17985eacded0f8a5))
* remove IEDName cruft ([9be450a](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/9be450a1c212f12ed5e84cc9581984acf181fda0))
* reposition palette above substation (closes [#119](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/issues/119)) ([2bec705](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/2bec705b18ffd9d107ae80ade736865924de1fba))
* resolve performance issues with IED scanning ([3e97894](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/3e97894b2856308091240991dd9e8e988916ad95))
* scl private element must be created with correct ns ([6832769](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/6832769dfec1eb4b70ff4f5045403aa2f4ee888e)), closes [#116](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/issues/116)
* set body background colour for demo ([5555f78](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/5555f78ae307da8abfc19ccb949fd3398a61e5e3))
* undo while connecting ([76a6e8a](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/76a6e8a510f38a96134b4710045edfecb0874039)), closes [#67](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/issues/67)
* use correct namespaces for elements ([d692eb4](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/d692eb4ed54bbfdb6af2e0e1a0bd06862aba48c1))


### Performance Improvements

* memoize static base SVG layers during cursor-driven renders ([7651c42](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/7651c423ce8307672e03e44fa2e655400de44429))
* resolve each element's SLD attribute source node once ([5f8a2d5](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/commit/5f8a2d5254988c50a2dfe7354300cf6492debbfc))

## Changelog
