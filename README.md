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

Jag har varit lite dålig på att pusha ofta eftersom jag gärna vill få in så mycket som möjligt för varje komponent. Egentligen borde jag ha tagit småsteg och pushat allteftersom, men pga tidspress så blev det inte så denna gång.
