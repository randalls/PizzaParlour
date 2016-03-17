# When contributing to listing-ui

Primary development branch is "develop". "master" is latest code deployed on production. When a new release is pushed to production, the release branch is merged into the "master" branch.

When a new release branch is cut, this is considered a code freeze for the release. No new features should be merged into a release branch, but bug fixes should be. Anything merged into release branch should also be merged into develop to avoid conflicts.

### Features
* branch: feature/{ ticket }-short-description

### Bugs/Defects
* branch: defect/{ ticket }-short-description

### Tasks/Tech-debt
* branch: task/{ ticket (if applicable) }-short-description

### Releases
* branch: release/release-name
