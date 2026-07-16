{
  description = "Slidev presentation";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-26.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };

        nodejs = pkgs.nodejs_24;
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs
            pnpm
            git
          ];

          shellHook = ''
            echo "Slidev development environment"
            echo ""
            echo "Install dependencies:"
            echo "  pnpm install"
            echo ""
            echo "Start development:"
            echo "  pnpm dev"
          '';
        };
      });
}