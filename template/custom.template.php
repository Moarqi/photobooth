		<!-- Start Page -->
		<div class="stages" id="start">
			<div class="startInner">
				<div class="divaussen">
					<div class="divinnen">
            					<div class="divinnen2">
							<?php if ($config['event']['enabled']): ?>
							<div class="names">
								<?php if ($config['ui']['decore_lines']): ?>
								<hr class="small" />
								<hr>
								<?php endif; ?>
								<div>
									<h1>
									<?=$config['event']['textLeft']?>
									<i class="fa <?=$config['event']['symbol']?>" aria-hidden="true"></i>
									<?=$config['event']['textRight']?>
									<?php if ($config['start_screen']['title_visible']): ?>
									<br>
									<?=$config['start_screen']['title']?>
									<?php endif; ?>
									</h1>
									<?php if ($config['start_screen']['subtitle_visible']): ?>
									<h2><?=$config['start_screen']['subtitle']?></h2>
									<?php endif; ?>
								</div>
								<?php if ($config['ui']['decore_lines']): ?>
								<hr>
								<hr class="small" />
								<?php endif; ?>
							</div>
							<?php else: ?>
							<div class="names">
								<?php if ($config['ui']['decore_lines']): ?>
								<hr class="small" />
								<hr>
								<?php endif; ?>
								<div>
									<?php if ($config['start_screen']['title_visible']): ?>
									<h1><?=$config['start_screen']['title']?></h1>
									<?php endif; ?>
									<?php if ($config['start_screen']['subtitle_visible']): ?>
									<h2><?=$config['start_screen']['subtitle']?></h2>
									<?php endif; ?>
								</div>
								<?php if ($config['ui']['decore_lines']): ?>
								<hr>
								<hr class="small" />
								<?php endif; ?>
							</div>
							<?php endif; ?>
							<div class="buttongroup">
							<?php if($config['button']['show_cups']): ?>
							<a id="cups-button" class="round-btn cups-button rotaryfocus" href="#" target="newwin"><i class="fa fa-print" aria-hidden="true"></i> <span>CUPS</span></a>
							<?php endif; ?>

							<?php if ($config['button']['force_buzzer']): ?>
								<div id="useBuzzer">
									<span data-i18n="use_button"></span>
								</div>
							<?php else: ?>
								<?php if (!($config['collage']['enabled'] && $config['collage']['only'])): ?>
								<a href="#" class="round-btn takePic rotaryfocus"><i class="fa fa-camera"></i> <span data-i18n="takePhoto"></span></a>
								<?php endif; ?>

								<?php if ($config['collage']['enabled']): ?>
								<a href="#" class="round-btn takeCollage rotaryfocus"><i class="fa fa-th-large"></i> <span data-i18n="takeCollage"></span></a>
								<?php endif; ?>
							<?php endif; ?>

							<?php if ($config['gallery']['enabled']): ?>
							<a href="#" class="round-btn gallery-button rotaryfocus"><i class="fa fa-picture-o"></i> <span data-i18n="gallery"></span></a>
							<?php endif; ?>
							<?php if($config['button']['show_fs']): ?>
							<a href="#" id="fs-button" class="round-btn fs-button"><i class="fa fa-arrows-alt"></i> <span data-i18n="toggleFullscreen"></span></a>
							<?php endif; ?>
							</div>
						</div>
						<button hidden class="closeGallery"></button>
						<button hidden class="triggerPic"></button>
						<button hidden class="triggerCollage"></button>
					</div>
				</div>
			</div>			
		</div>
