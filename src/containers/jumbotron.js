import React from "react";
import { Jumbotron } from "../components";
import jumboData from "../data/jumbo";

const JumbotronContainer = () => {
  return (
    <Jumbotron.Container>
      {jumboData.map((item) => (
        <Jumbotron key={item.id} direction={item.direction}>
          <Jumbotron.Pane>
            <Jumbotron.Title>{item.title}</Jumbotron.Title>
            <Jumbotron.SubTitle>{item.subTitle}</Jumbotron.SubTitle>
          </Jumbotron.Pane>
          <Jumbotron.Pane style={{ position: "relative" }}>
            <Jumbotron.Image src={item.image} alt={item.alt} />
            {item.video && (
              <Jumbotron.Animation
                maxWidth={item.maxWidth}
                maxHeight={item.maxHeight}
                top={item.top}
                left={item.left}>
                <Jumbotron.Video>
                  <source src={item.video} type="video/mp4"></source>
                </Jumbotron.Video>
              </Jumbotron.Animation>
            )}
          </Jumbotron.Pane>
        </Jumbotron>
      ))}
    </Jumbotron.Container>
  );
};

export { JumbotronContainer };
