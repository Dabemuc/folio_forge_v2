{ pkgs }: {
  channel = "stable-23.11";
  packages = [
    pkgs.nodejs_20
  ];
  idx = {
    extensions = [
      "esbenp.prettier-vscode"
    ];
    previews = {
      enable = true;
      previews = {
        web = {
          command = [
            "npm"
            "run"
            "dev"
            "--"
            "--port"
            "$PORT"
            "--hostname"
            "0.0.0.0"
          ];
          manager = "web";
        };
      };
    };
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Example: install JS dependencies from NPM
        npm-install = "npm install";
        # Open editors for the following files by default, if they exist:
        # default.openFiles = [ ".idx/dev.nix" "README.md" ];
        drizzle-opush = "npm run drizzle:push";
      };
      # Runs when the workspace is (re)started
      onStart = {
        # Example: start a background task to watch and re-build backend code
        # watch-backend = "npm run watch-backend";
      };
    };
  };
}
