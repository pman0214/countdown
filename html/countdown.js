/*
 * Copyright (c) 2014, Shigemi ISHIDA
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the Institute nor the names of its contributors
 *    may be used to endorse or promote products derived from this software
 *    without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE INSTITUTE AND CONTRIBUTORS ``AS IS'' AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED.  IN NO EVENT SHALL THE INSTITUTE OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
 * OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 */

$(function() {
    resize_display();
    countdown();
});

function resize_display() {
    var height=$('body').height();
    var width=$('body').width();
    var aheight=Math.min(height/6, width/6);
    /* 行の高さはフォントの高さの1.5倍 */ 
    $('#abst').css('line-height', aheight+'px');
    $('#abst').css('font-size', aheight*2/3+'px');
    var dheight=Math.min(height*10/18, width/3);
    $('#day').css('top', aheight+'px');
    $('#day').css('line-height', dheight+'px');
    $('#day').css('font-size', dheight+'px');
    var theight=Math.min(height*5/18, width/3);
    $('#time').css('top', aheight+dheight+'px');
    $('#time').css('font-size', theight*2/3+'px');
}
$(window).bind("resize", resize_display);

function zero_padding(val) {
    if (val < 10) {
        return '0' + val;
    }
    return val;
}

function countdown() {
    var start = new Date();
    var end = new Date($('#dst_time').html());
    var days = end - start;

    /* 日 */ 
    var day = Math.floor(days / (24*60*60*1000));
    days -= day * 24*60*60*1000;
    /* 時間 */
    var hour = Math.floor(days / (60*60*1000));
    days -= hour * 60*60*1000;
    /* 分 */
    var min = Math.floor(days / (60*1000));
    days -= min * 60*1000;
    /* 秒 */
    var sec = Math.floor(days / 1000);

    /* 10日を切ったら黄色、3日を以内になったら赤にする */
    if (day < 10) {
        $("#day").css('color', 'yellow');
        $("#time").css('color', 'yellow');
    }
    if (day <= 3) {
        $("#day").css('color', 'red');
        $("#time").css('color', 'red');
    }

    $("#day").text(day + "日");
    $("#time").text(hour + ":" + zero_padding(min) + ":" + zero_padding(sec));
    setTimeout('countdown()', 1000);
}
