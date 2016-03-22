FROM centos:7

RUN yum install -y epel-release
RUN yum install -y \
	nodejs \
	npm \
	wget \
	bzip2 \
	make \
	fontconfig \
	liberation-mono-fonts \
	liberation-narrow-fonts \
	liberation-sans-fonts \
	liberation-serif-fonts

COPY app /srv
WORKDIR /srv
RUN npm install --production

EXPOSE 3000

CMD ["/bin/bash"]
