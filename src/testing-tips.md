#### 🔗 A11y links:

www.scottohara.me
www.sarahmhigley.com
www.inclusive-components.design
www.heydonworks.com

#### Testing: lists with header

```tsx
test("initially empty list", async () => {
  const { user } = renderApp();

  const cardsList = screen.getByRole("list", {
    name: /header name/i,
  });

  expect(cardsList).toBeEmptyDOMElement(); //🍒no children
});

<article>
  <h2>Header name</h2>

  <ul>
    {props.items.map((item) => (
      <li key={item.id}>
        <ItemCard onDelete={props.onDelete} {...item} />
      </li>
    ))}
  </ul>
</article>;
```

> [!TIP]
> aria-labelledby [group lists](https://www.w3.org/WAI/WCAG21/Techniques/html/H48) > [recommendations on aria-labelledby](https://www.w3.org/TR/using-aria/#practical-support-aria-label-aria-labelledby-and-aria-describedby)

#### Testing: key-value pairs

```tsx
const ddElement = screen.getByRole("definition", {
  description: /text in dt term tag/i,
});

expect(ddElement).toHaveTextContent(/text in dd definition tag/i);

function DefinitionItem({ term, description }) {
  const termId = useId();

  return (
    <>
      <dt id={termId}>{term}</dt>
      <dd aria-describedby={termId}>{description}</dd> //🍒adds link to dt term
    </>
  );
}
```

> [!TIP]
> aria-labelledby for dd is prohibited in [wai-aria 1.3](https://w3c.github.io/aria/#definition)
> aria-labelledby for dd is recommended in [wai-aria 1.2](https://www.w3.org/TR/wai-aria-1.2/#definition)
> official discussion with my question [here](https://github.com/w3c/aria/issues/2074)

#### Debugging: logging roles

```tsx
test("log roles", () => {
  const { container } = renderApp();

  logRoles(container);
});
```

#### Mocking: child component

```tsx
vi.mock("../components/item-card", () => {
  return {
    ItemCard: () => <article>item card</article>,
  };
});
```

#### Testing: icon button

```tsx
test("icon button", async () => {
  screen.getByRole("button", {
    name: /button name/i,
  });
});

<button aria-label={`button name`}>X</button>; //🍒button with no text
```

#### A11y: Association of section with header

```tsx
const article = screen.getByRole("article", { name: /post card/i });

export function PostCard({ post, onLike, onDelete }: PostProps) {
  return (
    <article aria-labelledby="postCard">
      <h3 id="postCard">Post card</h3>

      <p>
        <button aria-label="like post button" onClick={() => onLike(post.id)}>
          👍
        </button>
        <button
          aria-label="delete post button"
          onClick={() => onDelete(post.id)}
        >
          🗑️
        </button>
      </p>
    </article>
  );
}
```

> [!TIP]
> aria-labelledby [regions and landmarks](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13)
