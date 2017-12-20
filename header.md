Great. I can now simply create a Header component with a trait like so:
```
{
  type: 'select',
  options: [
    {value: 'h1', name: 'One (largest)'},
    {value: 'h2', name: 'Two '},
    {value: 'h3', name: 'Three '},
    {value: 'h4', name: 'Four '},
    {value: 'h5', name: 'Five '},
    {value: 'h6', name: 'Six (smallest)'},
  ],
  label: 'Size',
  name: 'tagName',
  changeProp: 1
}
```
