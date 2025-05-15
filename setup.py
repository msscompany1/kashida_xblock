from setuptools import setup

setup(
    name='kashida_xblock',
    version='0.1',
    description='Kashida Layout XBlock',
    packages=['kashida_xblock'],
    install_requires=['XBlock'],
    entry_points={
        'xblock.v1': [
            'kashida = kashida_xblock.block:KashidaXBlock',
        ],
    },
    package_data={
        'kashida_xblock': ['static/*.*', 'static/**/*.*', 'templates/*.*'],
    },
)
