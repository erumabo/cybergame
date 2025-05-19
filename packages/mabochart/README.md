## Roadmap

__Done__

- Nested States
- Any state to any transitions
- Transition actions
- Entry, re-entry and exit actions
- You can pass any data object to the actions

__Planned__

- Relative transition target (sibling, descendant), right now you need to specify full path
- Non deterministic transitions: action can return a target
- Static tester tool, will crawl your machine def and flag any posible errors
- "Regex" or gobble events
- 

__Wont implement__

- State object management: I dont want to reimplement the wheel,
  your framework propably has a state management feature,
  and there's many small libs that do it better than I could.
- Observables and subscribers
- GUI editor