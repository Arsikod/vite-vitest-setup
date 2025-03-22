#### Testing: lists with header

```tsx
test("initially empty list", async () => {
  const { user } = renderApp();

  const cardsList = screen.getByRole("list", {
    name: /header name/i,
  });

  expect(cardsList).toBeEmptyDOMElement(); //🍒no children
});

<section>
  <h2 id="header-id">Header name</h2>
  //🍒adds name to "list" role
  <ul aria-labelledby="header-id">
    {props.items.map((item) => (
      <li key={item.id}>
        <ItemCard onDelete={props.onDelete} {...item} />
      </li>
    ))}
  </ul>
</section>;
```

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

> [!IMPORTANT]
> aria-labelledby for dd is prohibited in [wai-aria 1.3](https://w3c.github.io/aria/#definition)
> aria-labelledby for dd is recommended in [wai-aria 1.2](https://www.w3.org/TR/wai-aria-1.2/#definition)

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

      <dl></dl>

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
