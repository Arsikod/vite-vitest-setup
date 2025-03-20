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
expect(screen.getByLabelText(/key/i)).toHaveTextContent(/value/i);

function DefinitionItem({ term, description }) {
  const termId = useId();

  return (
    <>
      <dt id={termId}>{term}</dt>
      <dd aria-labelledby={termId}>{description}</dd>
    </>
  );
}
```

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
