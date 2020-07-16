# Publishing new releases

Follow these steps to publish new releases of all graph-paper packages:

1. Run `git switch main` to switch to the _main_ branch
2. Run `git pull origin main` to get the latest code

- If you don't have a remote named _origin_ which points to the
  graph-paper-org/graph-paper GitHub repo, run `git pull [remote] instead`,
  where _[remote]_ is the name of the remote which points to the
  graph-paper-org/graph-paper GitHub repo. For example: `git pull upstream main`

3. Run `npm whoami` to verify that you are logged into the npm CLI. If an error
   is printed, run `npm login`.
4. Run `npm org ls graph-paper` to verify that you are a _developer_, _admin_,
   or _owner_ of the graph-paper org. If you aren't, contact an admin or owner
   to be added.
5. Run `npx lerna version [version-number]` to tag a new release on GitHub,
   where _[version-number]_ is the new version number

- If you don't have a remote named _origin_ which points to the
  graph-paper-org/graph-paper GitHub repo, pass the `--git-remote` flag to the
  `npx lerna version` command, where _[remote]_ is the name of the remote which
  points to the graph-paper-org/graph-paper GitHub repo. For example:
  `npx lerna version --git-remote upstream [version-number]`

5. Run `npx lerna publish from-git` to publish a new version

- If you don't have a remote named _origin_ which points to the
  graph-paper-org/graph-paper GitHub repo, pass the `--git-remote` flag to the
  `npx lerna publish` command, where _[remote]_ is the name of the remote which
  points to the graph-paper-org/graph-paper GitHub repo. For example:
  `git lerna publish --git-remote upstream from-git`
