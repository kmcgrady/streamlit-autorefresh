# Streamlit Autorefresh

Streamlit component to force a refresh without tying up a script.
## Overview

Streamlit apps are scripts that a server runs based on interactions. When
a user interacts with the web app, the script reruns.

One Streamlit use case is a dashboard or realtime stats application. The
purpose is to regularly display stats on some interval. Currently, the
best way to support this is an infinite loop in the script, but that is
not a great practice and has led to a less desirable developer experience
in shutting down scripts and servers.

### How does this component help?

This component provides a timer on the frontend to regularly ping the Streamlit
server to rerun. This effectively allows the script to successfully execute and
finish properly and avoid tying up server resources. It effectively puts a
little more work on the user's browser than on the server.

# Installation

```
pip install streamlit-autorefresh
```

# Parameters

```
interval: int
    Amount of time in milliseconds to 
limit: int or None
    Amount of refreshes to allow. If none, it will refresh infinitely.
    While infinite refreshes sounds nice, it will continue to utilize
    computing resources.
debounce: boolean
    Whether to delay the autorefresh when user interaction occurs.
    Defaults to True in order to avoid refreshes interfering with
    interaction effects on scripts.
key: str or None
    An optional key that uniquely identifies this component. If this is
    None, and the component's arguments are changed, the component will
    be re-mounted in the Streamlit frontend and lose its current state.
```

## Returns

```
int
    Number of times the refresh has been triggered or max value of int
```

# Example Usage

```python
import streamlit as st
from streamlit_autorefresh import st_autorefresh

# Run the autorefresh about every 2000 milliseconds (2 seconds) and stop
# after it's been refreshed 100 times.
count = st_autorefresh(interval=2000, limit=100, key="fizzbuzzcounter")

# The function returns a counter for number of refreshes. This allows the
# ability to make special requests at different intervals based on the count
if count == 0:
    st.write("Count is zero")
elif count % 3 == 0 and count % 5 == 0:
    st.write("FizzBuzz")
elif count % 3 == 0:
    st.write("Fizz")
elif count % 5 == 0:
    st.write("Buzz")
else:
    st.write(f"Count: {count}")

```

## Caveats

This is a rather simplistic implementation and feature requests are welcome!

- The Frontend timer is not a perfect system, so the refresh interval is a
rough estimate. Feel free to adjust the interval to a limit that's practical
- Just like an infinite loop, a small interval, will constantly ping and make
server do more work and should be treated with caution.
- We recommend a `key` be added. It can be a string literal, but it will help
in maintaining the refresh rate and count.
- We recommend _NOT_ calling `st_autorefresh` multiple times in a script. It
will effectively create multiple timers and refresh at weird rates. It's best
to use one function call and utilize the counter to better adjust different
refresh rates
