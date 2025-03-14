import { Bento } from "../components/Bento";
import { Carousel } from "../components/Carousel";
import { Haiku } from "../components/Haiku";
import { TitledBlock } from "../components/TitledBlock";
import { WrapCenterer } from "../components/WrapCenterer";
import haikus from "../const/haikus.json";

export const Hero = () => {
  const todaysHaiku = haikus.reduce((last, h) => (last.id > h.id ? last : h));
  const specialHaiku = haikus.find((h) => h.selected) ?? {
    text: "",
    id: 0,
    date: "",
    selected: true,
    tags: [],
    hide: false,
  };

  return (
    <main>
      <Bento
        colors={{
          main: "#FFFFFF10",
          sideUp: "#FFFFFF10",
          sideDown: "#FFFFFF10",
          bottom: "#FFFFFF10",
        }}
        main={
          <TitledBlock title={<h2>Último Haiku</h2>}>
            <WrapCenterer>
              <Haiku haiku={todaysHaiku} size="xl" />
            </WrapCenterer>
          </TitledBlock>
        }
        sideUp={
          <TitledBlock
            title={
              <h2 style={{ viewTransitionName: "title-all" }}>Cronología</h2>
            }
            bottomRighted
          >
            <Carousel
              randomize
              style={{ viewTransitionName: "carousel" }}
              vertical
              slides={haikus
                .filter((h) => !h.hide)
                .sort(({ id: aId }, { id: bId }) => (aId < bId ? 1 : -1))
                .map((haiku) => {
                  return (
                    <WrapCenterer key={haiku.id}>
                      <a
                        href={`${import.meta.env.BASE_URL}all/${haiku.id}`}
                        style={{ width: "100%" }}
                      >
                        <Haiku haiku={haiku} showDate size="s" />
                      </a>
                    </WrapCenterer>
                  );
                })}
            ></Carousel>
          </TitledBlock>
        }
        sideDown={
          <TitledBlock title={<h2>Destacado</h2>} bottomRighted>
            <WrapCenterer>
              <Haiku haiku={specialHaiku} showDate size="s" />
            </WrapCenterer>
          </TitledBlock>
        }
        bottom={
          <TitledBlock
            title={<h2 style={{ viewTransitionName: "title-about" }}>About</h2>}
          >
            <p>
              ¡Hola! Soy Jose. Escribir haikus es una forma de expresarme y de
              llevar alguna forma de diario. ¡Espero que los disfrutes!
            </p>
          </TitledBlock>
        }
      />
    </main>
  );
};

export default Hero;
