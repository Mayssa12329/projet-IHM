const fs = require('fs');
let file = 'frontend/app/forum/page.tsx';
let c = fs.readFileSync(file, 'utf8');

c = c.replace(/\{\/\*\ Page Title \*\/\}([\s\S]*?)\{\/\*\ New Post Button \*\/\}/g, 
        {/* Page Title */}
\
        {/* Custom News Feed for Signed Up Users */}
        {user && user.topics && user.topics.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-4">Vos Actualités (Flux personnalisé)</h3>
            <div className="p-6 bg-card rounded-lg border border-border shadow-sm mb-8">
              <p className="text-muted-foreground mb-4">
                Bonjour \ ! Voici votre fil d'actualité comme sur Facebook qui correspond à vos thèmes sélectionnés : <span className="font-semibold text-primary/80 uppercase text-sm ml-2">\</span>.
              </p>
              <Link href={\/forum/category/\\}>
                <Button variant="outline" className="font-medium mr-4">
                  Voir les discussions
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* New Post Button */});

fs.writeFileSync(file, c);
console.log('Injected custom news feed UI into forum page');
