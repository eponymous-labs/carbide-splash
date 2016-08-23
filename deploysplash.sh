sed 's,static/,https://eponymous-labs.github.io/carbide-splash/static/,' index.html > splash.html
scp splash.html gui_westeros@ssh.phx.nearlyfreespeech.net:static