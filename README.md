# World-Clock

Här är min applikation för att kolla upp lokal tid för olika städer runtom i världen. Det finns förladdade städer (featured) när man först öppnar webbsidan, med alternativ för att söka efter städer som inte redan syns och även lägga till egna städer samt favoritmarkera. Samtliga städer som visas har alternativet att visa digital eller analog klocka.

För att köra applikationen, använd nedan kommandon:

```
git clone https://github.com/Martensven/World-Clock.git
cd World-clock
npm install
npm run dev
```

# Loggbok

## Skiss

Länk till Figma: https://www.figma.com/design/MigocoBmm4QwzAIY9oc2FM/Untitled?node-id=0-1&p=f&t=M6HikO9ZXMz1WMo7-0

## Uppdelning av applikationen

Jag har valt att dela upp min applikation baserat på hur det visas:
```
<Header></Header>

    <Routes>
      <Route path="/World-Clock/" element={<FrontPage />}></Route>
      <Route path="/World-Clock/add-city" element={<AddCity />}></Route>
      <Route path="/World-Clock/favorites" element={<Favorites />}></Route>
    </Routes>

    <Footer></Footer>
  </>;
```
Så att varje component har sin egen mapp och alla delar som spelar in i respektive route (som inte är globala) ligger i samma mappar. till exemel en mapp för frontpage, en för att lägga till egna städer och en för att visa favoriter.

Globala komponenter/komponenter som återanvänds ligger i sina egna mappar. JSON-fil i en mapp, interfaces i en mapp och analoga klockan i en.

Styling sköts globalt, då det inte är allt för mycket kod.

## Användning av Git

Jag har varit lite dålig på att pusha ofta eftersom jag gärna vill få in så mycket som möjligt för varje komponent. Egentligen borde jag ha tagit småsteg och pushat allt eftersom, men pga tidspress så blev det inte så denna gång.

## Testning

Testning har jag enbart gjort i webbläsaren genom att klicka runt och försöka 
skapa problem, men jag åker inte på några problem i varken funktion eller console. Skriver man in en stad som redan finns i antingen JSON-filen eller localstorage så får man ett meddelande som påpekar detta.

# Förklara minst 3 ställen där TypeScript ger fördelar jämfört med JavaScript i din kod:

1. Tydlig styrning av vad som visas:
Jag kan enkelt se till vad som ska visas på startsidan respektive favoritsidan. Genom att använda interfaces kolla booleans för featured och favorite kan jag vara säker på att det inte pushas in något felaktigt i listorna. Jag kan därför se till att dessa fält alltid finns och alltid är av rätt typ.

2. Säkra inputs:
Jag kan undvika buggar genom att säkerställa att alla inputs tar emot rätt typ när man lägger till en stad. Exempel: timeZone måste vara ett nummer, annars varnar TypeScript direkt.

3. När jag deklarerar state med t.ex. ```useState<CityCard[]>([])``` garanterar TypeScript att det bara kan innehålla CityCard-objekt. Det gör att jag kan typkolla all data (cityName, countryName, timeZone osv.) och inte kan lägga in något ogiltigt.

# Beskriv hur TypeScript transpileras till JavaScript i ditt projekt:
1. Skrivs i TS/TSX (webbläsaren kan inte läsa direkt)

2. Vite tar bort typer och transpilerar JSX/TSX till JS

3. Bygger en optimerad bundle i dist/ med JS och statiska assets (bilder och CSS)

4. Webbläsaren kör sedan bara den färdiga JavaScript-koden
