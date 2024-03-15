# Driver Station App

## Dependencies

* Volta: <https://docs.volta.sh/guide/getting-started> (Install on Mac w/ Homebrew cask: `brew install volta`)

## Install / Configuration

* `volta install node`
* `volta install pnpm`
* `volta run pnpm install`

## Build / Run

* Run robot simulation or Romi in local environment OR run live robot and connect remotely
* Development
  * `pnpm dev` (builds and runs the app locally for development with live UI refresh on edit/save)
* Binary packaging and distribution
  * `pnpm package` (builds and packages Windows portable executable file for simple copy distribution to driver station)
* Other
  * See `scripts` section in `package.json` file for more options
