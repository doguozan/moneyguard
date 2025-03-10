# GitHub'a Yükleme ve GitHub Pages'a Deploy Etme Adımları

Bu belge, Money Guard projesini GitHub'a yüklemek ve GitHub Pages'a deploy etmek için gerekli adımları içerir.

## 1. GitHub'da Repository Oluşturma

1. GitHub hesabınıza giriş yapın.
2. Sağ üst köşedeki "+" simgesine tıklayın ve "New repository" seçeneğini seçin.
3. Repository adı olarak "moneyguard" girin.
4. Repository'yi public olarak ayarlayın.
5. "Create repository" butonuna tıklayın.

## 2. Projeyi GitHub'a Yükleme

Aşağıdaki komutları sırasıyla çalıştırın:

```bash
# Eğer git henüz başlatılmadıysa
git init

# Remote repository'yi ekleyin (GitHub kullanıcı adınızı kullanın)
git remote add origin https://github.com/KULLANICI_ADINIZ/moneyguard.git

# Tüm dosyaları ekleyin
git add .

# Commit oluşturun
git commit -m "Initial commit"

# Main branch'e push yapın
git push -u origin main
```

## 3. GitHub Pages'a Deploy Etme

Projeyi GitHub Pages'a deploy etmek için iki yöntem vardır:

### 1. Yöntem: npm run deploy Komutu

Bu yöntem, gh-pages paketini kullanarak projeyi otomatik olarak deploy eder.

```bash
# Projeyi build edin ve GitHub Pages'a deploy edin
npm run deploy
```

### 2. Yöntem: GitHub Actions ile Deploy

1. GitHub repository'nizde "Actions" sekmesine gidin.
2. "New workflow" butonuna tıklayın.
3. "Node.js" workflow'unu seçin.
4. Aşağıdaki workflow dosyasını oluşturun:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@4.1.4
        with:
          branch: gh-pages
          folder: dist
```

5. "Start commit" butonuna tıklayın ve workflow'u commit edin.

## 4. GitHub Pages Ayarları

1. GitHub repository'nizde "Settings" sekmesine gidin.
2. Sol menüden "Pages" seçeneğine tıklayın.
3. "Source" bölümünde "Deploy from a branch" seçeneğini seçin.
4. Branch olarak "gh-pages" seçin ve "Save" butonuna tıklayın.
5. Birkaç dakika bekleyin ve siteniz yayınlanacaktır.

## 5. Sitenize Erişim

Sitenize aşağıdaki URL'den erişebilirsiniz:

```
https://KULLANICI_ADINIZ.github.io/moneyguard/
```

## Not

- GitHub Pages'da yayınlanan sitenizin URL'si, package.json dosyasındaki "homepage" alanı ile aynı olmalıdır.
- Eğer farklı bir repository adı kullanırsanız, package.json, vite.config.js ve src/main.jsx dosyalarındaki ilgili alanları güncellemeniz gerekir.
