import setuptools

setuptools.setup(
    name="streamlit-autorefresh",
    version="1.0.1",
    author="Ken McGrady",
    author_email="ken.mcgrady@gmail.com",
    description="Simple way to autorefresh your Streamlit apps",
    long_description="Simple way to autorefresh your Streamlit apps",
    long_description_content_type="text/plain",
    url="https://github.com/kmcgrady/streamlit-autorefresh",
    packages=setuptools.find_packages(),
    include_package_data=True,
    classifiers=[],
    python_requires=">=3.6",
    install_requires=[
        # By definition, a Custom Component depends on Streamlit.
        # If your component has other Python dependencies, list
        # them here.
        "streamlit >= 0.75",
    ],
)
