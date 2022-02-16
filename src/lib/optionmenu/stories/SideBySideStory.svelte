<script>
  import { OptionMenu, Option } from "..";

  let fontSize = "16px";
  let formatting = [];
  let textAlign = "left";
</script>

<div
  id="page"
  style={`
  --font-size: ${fontSize};
  --font-style: ${formatting.includes("italic") ? "italic" : "normal"};
  --font-weight: ${formatting.includes("bold") ? "bold" : "normal"};
  --text-decoration: ${formatting.includes("underline") ? "underline" : "none"};
  --text-align: ${textAlign};
`}
>
  <div id="toolbar">
    <input id="filename" type="text" placeholder="Filename" />
    <div id="menus">
      <OptionMenu
        on:selection={({ detail: { key } }) => {
          fontSize = key;
        }}
      >
        <Option selected={fontSize === "16px"} key="16px" label="16px" />
        <Option selected={fontSize === "24px"} key="24px" label="24px" />
        <Option selected={fontSize === "32px"} key="32px" label="32px" />
      </OptionMenu>
      <OptionMenu
        multi
        on:selection={({ detail: { keys } }) => {
          formatting = keys;
        }}
      >
        <Option selected={formatting.includes("bold")} key="bold" label="Bold">
          <span slot="right" class="bold">B</span>
        </Option>
        <Option
          selected={formatting.includes("italic")}
          key="italic"
          label="Italic"
        >
          <span slot="right" class="italic">I</span>
        </Option>
        <Option
          selected={formatting.includes("underline")}
          key="underline"
          label="Underlined"
        >
          <span slot="right" class="underline">U</span>
        </Option>
      </OptionMenu>
      <OptionMenu
        on:selection={({ detail: { key } }) => {
          textAlign = key;
        }}
      >
        <Option selected={textAlign === "left"} key="left" label="Left" />
        <Option selected={textAlign === "center"} key="center" label="Center" />
        <Option selected={textAlign === "right"} key="right" label="Right" />
      </OptionMenu>
    </div>
  </div>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum congue
    ligula arcu, vitae egestas elit volutpat sit amet. Lorem ipsum dolor sit
    amet, consectetur adipiscing elit. Etiam sed lobortis nisi. Praesent luctus
    mollis nisl ac imperdiet. Sed eget nisl lorem. Ut pharetra sit amet quam eu
    pharetra. Donec augue tellus, blandit non scelerisque vel, consequat at
    mauris.
  </p>
  <p>
    Mauris vestibulum justo ac tristique cursus. Ut sed sollicitudin nunc. Nunc
    vestibulum sollicitudin orci vitae rutrum. Proin ac magna pretium, lacinia
    nulla in, dignissim erat. Vestibulum ligula lectus, lobortis quis
    pellentesque fermentum, pretium quis nunc. Morbi vel odio at elit
    sollicitudin efficitur vitae id nisi. Morbi in justo vestibulum, malesuada
    ante vel, vehicula sem.
  </p>
  <p>
    Proin vehicula sem ipsum, at convallis sapien tempus sed. Cras porta, ligula
    vel viverra malesuada, nisl nunc tempor libero, at faucibus ipsum mauris ac
    ex. Quisque sit amet aliquam purus. Morbi facilisis metus nec nisi
    tristique, ultrices bibendum orci dictum. Proin nec elit in purus tincidunt
    vulputate at molestie massa. Duis ultricies, magna ut consequat aliquet,
    dolor risus vehicula magna, non tincidunt tortor magna quis lectus. Integer
    et luctus mi, id imperdiet augue. Donec ultrices dictum blandit. Maecenas
    faucibus, lectus quis faucibus ornare, arcu nibh aliquet leo, ac porttitor
    ipsum metus et enim. Curabitur id metus vitae odio posuere luctus. Nam
    turpis justo, venenatis vitae ligula sed, fringilla efficitur sapien. Duis
    odio purus, mollis id nisl a, commodo aliquet felis. In hac habitasse platea
    dictumst. Suspendisse et dui erat.
  </p>
  <p>
    Ut quam tortor, ultricies sed velit id, fermentum gravida nunc. Curabitur
    sit amet elementum velit, sit amet condimentum magna. Pellentesque habitant
    morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut
    facilisis pretium diam ut fringilla. Fusce semper massa sit amet maximus
    gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
    posuere cubilia Curae; Sed elementum dolor nulla, nec tristique tortor
    vehicula id. Pellentesque rutrum augue id risus fermentum tempor. Duis non
    ipsum mi. Aenean tempus ante quam, id ullamcorper metus ullamcorper sit
    amet. Quisque id nunc leo. Phasellus consectetur, lacus sit amet convallis
    tempus, purus erat elementum velit, sed aliquam nulla mauris sed dui. Mauris
    at volutpat magna. Etiam eget porta lectus, vel eleifend tortor. Nulla et
    consequat dui, et tempus nulla. Donec non tincidunt ante.
  </p>
  <p>
    Mauris interdum fringilla metus et dignissim. Mauris sagittis quis lorem
    eget sollicitudin. Proin convallis nulla a neque iaculis aliquam. Ut
    sagittis auctor dui, eu dictum sapien bibendum sit amet. Aliquam sed risus
    in eros rutrum tincidunt in ut velit. Ut lobortis ultricies urna nec
    fermentum. Donec vulputate lacus eget sem gravida cursus. Nulla vulputate
    convallis nisl. Nunc viverra scelerisque nunc eget vulputate. Aenean neque
    nibh, hendrerit at nulla a, pulvinar gravida metus. In egestas elit vel
    nulla ultrices rutrum.
  </p>
  <p>
    Morbi imperdiet tellus at pulvinar lacinia. Proin aliquet lectus vel
    vestibulum elementum. Ut auctor lacus non metus facilisis accumsan. Nulla
    viverra quis tortor eget sagittis. Curabitur eu odio eu enim suscipit
    pharetra. Fusce leo sapien, laoreet sit amet faucibus id, mattis et diam.
    Praesent ultrices ante ante, eu dictum quam placerat ut. Phasellus nec
    sodales ex. Praesent nec suscipit nunc. Nunc nec turpis porta, dignissim
    augue vitae, fermentum turpis. Cras maximus rhoncus felis vel lobortis.
    Phasellus pretium magna ut turpis auctor suscipit. Integer sapien lectus,
    ultrices nec ornare eu, vehicula in diam. Sed velit dolor, egestas quis
    hendrerit et, sodales eu tortor. Quisque vitae dui lorem.
  </p>
  <p>
    Curabitur quis diam tristique arcu laoreet gravida non eget nulla. Ut
    efficitur vestibulum elit sagittis tempor. Nam placerat ipsum nec lacus
    sagittis, sed sodales quam feugiat. Etiam maximus quam eros, eu fermentum
    turpis efficitur sed. Vestibulum pulvinar est mauris, vitae tincidunt turpis
    congue ac. Cras convallis felis nec justo condimentum ultricies. Fusce
    vulputate quam lacinia enim rutrum, sed dictum justo interdum. Ut vitae ante
    tellus. Cras in aliquet eros, vitae commodo elit.
  </p>
  <p>
    Quisque imperdiet sagittis risus, eget dignissim nisl. Donec euismod ac enim
    sit amet porta. Fusce pretium lacus sed arcu pellentesque imperdiet.
    Vestibulum faucibus consequat ipsum, at bibendum elit placerat nec.
    Pellentesque habitant morbi tristique senectus et netus et malesuada fames
    ac turpis egestas. Sed ultricies nibh mauris, et lobortis nulla pellentesque
    a. Aenean gravida imperdiet rhoncus.
  </p>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget nisi non
    lorem varius mollis nec non sapien. Aenean fringilla dictum lacus, sit amet
    consequat tortor eleifend quis. Aenean rutrum felis sed nisi elementum,
    vitae convallis sem aliquam. Sed blandit odio efficitur mattis ultricies. Ut
    convallis sed arcu et posuere. Quisque ultrices tortor sit amet rhoncus
    viverra. Nunc eu augue massa. Aenean volutpat purus augue, sit amet volutpat
    sem vulputate eu. Nunc nulla nunc, condimentum id euismod sed, porttitor a
    risus. Quisque a ligula neque. Proin efficitur augue sit amet ornare
    sagittis. Maecenas porta ante odio, eu finibus turpis tempus ut. Donec
    lobortis mi leo, at pellentesque orci imperdiet eget.
  </p>
  <p>
    Phasellus vulputate nunc a vulputate posuere. Ut semper nisl ante,
    scelerisque finibus metus sollicitudin nec. Sed dui nunc, interdum ut purus
    sed, commodo finibus velit. Morbi sem massa, malesuada ornare fermentum non,
    porta vel mi. Curabitur sem turpis, consectetur imperdiet vestibulum in,
    posuere non felis. Sed nec nibh sollicitudin, fermentum diam eu, facilisis
    lorem. Phasellus purus arcu, maximus suscipit risus sit amet, facilisis
    imperdiet mauris. Nulla sit amet sapien ante. Donec in odio et diam luctus
    tincidunt. Quisque in est massa. Maecenas lorem tortor, feugiat non neque
    et, sollicitudin fermentum ipsum. Sed dictum venenatis nibh, a congue dolor
    euismod eu. Curabitur dictum pharetra nibh euismod imperdiet. Praesent in
    turpis id odio cursus luctus at id ligula. Sed blandit, libero id elementum
    dapibus, risus sem maximus quam, a mattis ligula diam in lacus. Proin
    lobortis ac quam id placerat.
  </p>
</div>

<style>
  #page {
    height: 65vh;
    overflow: auto;
    width: 65vw;
  }

  #toolbar {
    align-items: center;
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
  }

  #filename {
    font-size: 0.8em;
    margin: 0;
  }

  #menus {
    background: #fff;
    display: grid;
    grid-auto-flow: column;
    grid-gap: 10px;
    justify-content: end;
    padding: 10px;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  p {
    margin-right: 10px;
    font-size: var(--font-size);
    font-style: var(--font-style);
    font-weight: var(--font-weight);
    text-decoration: var(--text-decoration);
    text-align: var(--text-align);
  }

  .bold {
    font-weight: bold;
  }

  .italic {
    font-style: italic;
    left: -3px;
    position: relative;
    top: -1px;
  }

  .underline {
    position: relative;
    text-decoration: underline;
    top: -1px;
  }
</style>
